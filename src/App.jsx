import { useCallback, useEffect, useMemo, useState } from 'react'

import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import WhatIsSubscription from './components/WhatIsSubscription.jsx'
import Pricing from './components/Pricing.jsx'
import Compare from './components/Compare.jsx'
import Stores from './components/Stores.jsx'
import Facility from './components/Facility.jsx'
import AddOns from './components/AddOns.jsx'
import Benefits from './components/Benefits.jsx'
import OpenEvent from './components/OpenEvent.jsx'
import HowToUse from './components/HowToUse.jsx'
import Faq from './components/Faq.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import StickyCta from './components/StickyCta.jsx'
import ConsultSheet from './components/ConsultSheet.jsx'

import { useReveal } from './hooks/useReveal.js'
import { BASE_MONTHLY_PRICE, getProduct } from './data/products.js'
import { getStore } from './data/stores.js'
import { monthlyPriceFor, productPriceFor } from './lib/format.js'
import { EVENTS, captureUtm, track } from './lib/tracking.js'

const SELECTION_KEY = 'rc_gudok_selection'

/** StrictMode 이중 실행·재마운트로 landing_view 가 중복 집계되지 않게 한 번만 보낸다 */
let landingTracked = false

/** 앵커로 부드럽게 이동 (고정 네비 높이 보정) */
const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
}

export default function App() {
  useReveal()

  const [selectedStoreId, setSelectedStoreId] = useState(null)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const selectedStore = useMemo(() => (selectedStoreId ? getStore(selectedStoreId) : null), [selectedStoreId])
  const selectedProduct = useMemo(
    () => (selectedProductId ? getProduct(selectedProductId) : null),
    [selectedProductId],
  )

  /** 하단 고정 CTA · FINAL CTA 에 노출할 대표 가격 (선택 지점 반영) */
  const displayPrice = useMemo(
    () => monthlyPriceFor(selectedStore, BASE_MONTHLY_PRICE),
    [selectedStore],
  )

  /** 상담 시트에 넘길 가격 — 선택 상품 기준 */
  const sheetPrice = useMemo(() => {
    if (!selectedProduct) return displayPrice
    return productPriceFor(selectedProduct, selectedStore, BASE_MONTHLY_PRICE)
  }, [selectedProduct, selectedStore, displayPrice])

  /* ── 초기화: UTM 수집 + 랜딩 조회 이벤트 + 이전 선택 복원 ── */
  useEffect(() => {
    captureUtm()
    if (!landingTracked) {
      landingTracked = true
      track(EVENTS.LANDING_VIEW)
      track(EVENTS.PRODUCT_VIEW, { product_id: 'monthly' })
    }

    try {
      const saved = JSON.parse(window.sessionStorage.getItem(SELECTION_KEY) || 'null')
      if (saved?.storeId && getStore(saved.storeId)) setSelectedStoreId(saved.storeId)
      if (saved?.productId && getProduct(saved.productId)) setSelectedProductId(saved.productId)
    } catch {
      /* storage 차단 환경 — 선택 복원만 생략 */
    }
  }, [])

  /* ── 선택 상태 보존 (새로고침·뒤로가기 대비) ── */
  useEffect(() => {
    try {
      window.sessionStorage.setItem(
        SELECTION_KEY,
        JSON.stringify({ storeId: selectedStoreId, productId: selectedProductId }),
      )
    } catch {
      /* noop */
    }
  }, [selectedStoreId, selectedProductId])

  const handleSelectStore = useCallback((store) => {
    setSelectedStoreId(store.id)
    track(EVENTS.STORE_SELECT, {
      store_id: store.id,
      store_name: store.storeName,
      brand: store.brand.key,
    })
  }, [])

  const handleSelectProduct = useCallback(
    (product) => {
      setSelectedProductId(product.id)
      track(EVENTS.PRODUCT_SELECT, {
        product_id: product.id,
        product_name: product.productName,
        price: productPriceFor(product, selectedStore, BASE_MONTHLY_PRICE),
      })

      // 상담 문의형 상품은 바로 시트를, 구독형은 지점 선택을 유도한다
      if (product.cta.intent === 'consult') {
        setSheetOpen(true)
        return
      }
      if (!selectedStoreId) {
        scrollToId('store')
        return
      }
      setSheetOpen(true)
    },
    [selectedStore, selectedStoreId],
  )

  /** 대표 구독 CTA — 지점이 없으면 지점 선택으로, 있으면 상담 시트로 */
  const handleSubscribe = useCallback(
    (source) => {
      track(EVENTS.SUBSCRIPTION_CTA_CLICK, {
        source,
        store_id: selectedStoreId,
        product_id: selectedProductId,
        price: displayPrice,
      })
      if (!selectedStoreId) {
        scrollToId('store')
        return
      }
      setSheetOpen(true)
    },
    [selectedStoreId, selectedProductId, displayPrice],
  )

  const handleConsult = useCallback(
    (product) => {
      if (product?.id) setSelectedProductId(product.id)
      track(EVENTS.CONSULTATION_CLICK, {
        store_id: selectedStoreId,
        product_id: product?.id ?? selectedProductId,
      })
      setSheetOpen(true)
    },
    [selectedStoreId, selectedProductId],
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
        <Problem />
        <WhatIsSubscription />
        <Pricing
          selectedStore={selectedStore}
          selectedProductId={selectedProductId}
          onSelectProduct={handleSelectProduct}
        />
        <Compare selectedStore={selectedStore} />
        <Stores selectedStoreId={selectedStoreId} onSelectStore={handleSelectStore} />
        <Facility selectedStoreId={selectedStoreId} onSelectStore={handleSelectStore} />
        <AddOns />
        <Benefits />
        <OpenEvent onConsult={handleConsult} />
        <HowToUse />
        <Faq />
        <FinalCta
          price={displayPrice}
          selectedStore={selectedStore}
          onSubscribe={() => handleSubscribe('final')}
          onConsult={() => handleConsult(null)}
        />
      </main>

      <Footer />

      <StickyCta
        price={displayPrice}
        selectedStore={selectedStore}
        onSubscribe={() => handleSubscribe('sticky')}
      />

      <ConsultSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        store={selectedStore}
        product={selectedProduct}
        price={sheetPrice}
      />
    </>
  )
}
