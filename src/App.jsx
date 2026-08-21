import { useCallback, useEffect, useMemo, useState } from 'react'

import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import CampaignWhy from './components/CampaignWhy.jsx'
import Pricing from './components/Pricing.jsx'
import Stores from './components/Stores.jsx'
import SelectedStore from './components/SelectedStore.jsx'
import AddOns from './components/AddOns.jsx'
import Facility from './components/Facility.jsx'
import MemberInterview from './components/MemberInterview.jsx'
import Benefits from './components/Benefits.jsx'
import OpenEvent from './components/OpenEvent.jsx'
import HowToUse from './components/HowToUse.jsx'
import Faq from './components/Faq.jsx'
import Summary from './components/Summary.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import StickyCta from './components/StickyCta.jsx'
import ConsultSheet from './components/ConsultSheet.jsx'

import { useReveal } from './hooks/useReveal.js'
import { BASE_MONTHLY_PRICE } from './data/products.js'
import { getStore } from './data/stores.js'
import { buildQuote, isOptionAvailable } from './lib/pricing.js'
import { EVENTS, captureUtm, track, withUtm } from './lib/tracking.js'

/**
 * ⚠ 선택 상태를 세션에 복원하지 않는다.
 *
 * 이전 방문에서 보건대점(45,000원)을 골랐던 브라우저가 페이지를 다시 열었을 때
 * 월 구독 카드 메인 가격이 45,000원으로 뜨는 문제가 있었다.
 * 45,000원은 보건대점 한정 예외가이므로, 페이지를 열었을 때의 기본값은
 * 언제나 48,900원이어야 한다. 그래서 복원 기능을 없앴다.
 */

/** StrictMode 이중 실행·재마운트로 landing_view 가 중복 집계되지 않게 한 번만 보낸다 */
let landingTracked = false

const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
}

/**
 * 선택 동선
 *   지점 선택 → 상품 선택 → 추가옵션 선택 → 선택내용 확인 → CTA
 *
 * 섹션 순서(상품이 지점보다 위)는 그대로 두고, 각 선택 뒤에
 * '아직 안 고른 다음 단계' 로 안내해서 어느 순서로 시작해도 흐름이 이어지게 한다.
 */
export default function App() {
  useReveal()

  const [selectedStoreId, setSelectedStoreId] = useState(null)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [selectedOptionIds, setSelectedOptionIds] = useState([])
  const [sheetOpen, setSheetOpen] = useState(false)

  const selectedStore = useMemo(
    () => (selectedStoreId ? getStore(selectedStoreId) : null),
    [selectedStoreId],
  )

  /** 선택 상태 전체를 하나의 견적으로 계산한다 (화면은 이 결과만 그린다) */
  const quote = useMemo(
    () =>
      buildQuote({
        store: selectedStore,
        productId: selectedProductId,
        optionIds: selectedOptionIds,
      }),
    [selectedStore, selectedProductId, selectedOptionIds],
  )

  /* ── 초기화 ── */
  useEffect(() => {
    captureUtm()
    if (!landingTracked) {
      landingTracked = true
      track(EVENTS.LANDING_VIEW)
      track(EVENTS.PRODUCT_VIEW, { product_id: 'monthly' })
    }
    // 이전 방문의 선택을 복원하지 않는다 (위 주석 참고)
    try {
      window.sessionStorage.removeItem('rc_gudok_selection')
    } catch {
      /* noop */
    }
  }, [])

  /* ── 지점 선택 ── */
  const handleSelectStore = useCallback(
    (store) => {
      setSelectedStoreId(store.id)
      // 그 지점에서 미운영인 옵션은 자동으로 해제한다
      setSelectedOptionIds((prev) => prev.filter((id) => isOptionAvailable(store, id)))
      track(EVENTS.STORE_SELECT, {
        store_id: store.id,
        store_name: store.name,
        brand: store.brand.key,
      })
      window.setTimeout(() => scrollToId('selected-store'), 120)
    },
    [],
  )

  /* ── 상품 선택 ── */
  const handleSelectProduct = useCallback(
    (product) => {
      setSelectedProductId(product.id)
      track(EVENTS.PRODUCT_SELECT, {
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        store_id: selectedStoreId,
      })

      // 가격·정책 미확정 상품은 바로 문의로 연결한다
      if (product.ctaIntent === 'consult') {
        setSheetOpen(true)
        return
      }
      // 다음으로 안 고른 단계로 안내
      scrollToId(selectedStoreId ? 'options' : 'store')
    },
    [selectedStoreId],
  )

  /* ── 추가옵션 토글 ── */
  const handleToggleOption = useCallback(
    (optionId) => {
      if (!isOptionAvailable(selectedStore, optionId)) return
      setSelectedOptionIds((prev) => {
        const next = prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
        track(EVENTS.OPTION_SELECT, {
          option_id: optionId,
          selected: !prev.includes(optionId),
          store_id: selectedStoreId,
          product_id: selectedProductId,
        })
        return next
      })
    },
    [selectedStore, selectedStoreId, selectedProductId],
  )

  /**
   * 구독 CTA — 모든 CTA 가 이 handler 하나를 쓴다.
   * 지점별 가입 URL(ctaUrl)이 확정되면 그쪽으로 보내고(UTM 유지),
   * 아직 없으면 상담 시트를 연다. 가짜 URL 을 만들지 않는다.
   */
  const handleSubscribe = useCallback(
    (source) => {
      track(EVENTS.SUBSCRIPTION_CTA_CLICK, {
        source,
        store_id: selectedStoreId,
        product_id: quote.product.id,
        option_ids: selectedOptionIds,
        price: quote.total ?? quote.basePrice,
      })

      if (!selectedStoreId) {
        scrollToId('store')
        return
      }
      if (selectedStore?.ctaUrl) {
        window.open(withUtm(selectedStore.ctaUrl), '_blank', 'noopener,noreferrer')
        return
      }
      setSheetOpen(true)
    },
    [selectedStoreId, selectedStore, selectedOptionIds, quote],
  )

  const handleConsult = useCallback(
    (product) => {
      if (product?.id) setSelectedProductId(product.id)
      track(EVENTS.CONSULTATION_CLICK, {
        store_id: selectedStoreId,
        product_id: product?.id ?? quote.product.id,
      })
      setSheetOpen(true)
    },
    [selectedStoreId, quote],
  )

  return (
    <>
      <Nav onSubscribe={() => handleSubscribe('nav')} />

      <main>
        <Hero
          basePrice={BASE_MONTHLY_PRICE}
          onSubscribe={() => handleSubscribe('hero')}
          onViewProducts={() => scrollToId('price')}
        />
        <CampaignWhy />
        <Pricing
          selectedStore={selectedStore}
          selectedProductId={selectedProductId}
          onSelectProduct={handleSelectProduct}
        />
        <Stores selectedStoreId={selectedStoreId} onSelectStore={handleSelectStore} />
        <SelectedStore store={selectedStore} onSubscribe={() => handleSubscribe('selected-store')} />
        <AddOns
          store={selectedStore}
          quote={quote}
          selectedOptionIds={selectedOptionIds}
          onToggleOption={handleToggleOption}
        />
        <Facility selectedStore={selectedStore} />
        <MemberInterview />
        <Benefits />
        <OpenEvent onConsult={handleConsult} />
        <HowToUse />
        <Faq />
        <Summary
          store={selectedStore}
          quote={quote}
          hasProductSelection={Boolean(selectedProductId)}
          onSubscribe={() => handleSubscribe('summary')}
          onPickStore={() => scrollToId('store')}
        />
        <FinalCta
          price={quote.total ?? quote.basePrice}
          selectedStore={selectedStore}
          onSubscribe={() => handleSubscribe('final')}
          onConsult={() => handleConsult(null)}
        />
      </main>

      <Footer />

      <StickyCta store={selectedStore} quote={quote} onSubscribe={() => handleSubscribe('sticky')} />

      <ConsultSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        store={selectedStore}
        quote={quote}
      />
    </>
  )
}
