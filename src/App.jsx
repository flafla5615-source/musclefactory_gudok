import { useCallback, useEffect, useMemo, useState } from 'react'

import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import WhatIsSubscription from './components/WhatIsSubscription.jsx'
import Pricing from './components/Pricing.jsx'
import Stores from './components/Stores.jsx'
import SelectedStore from './components/SelectedStore.jsx'
import AddOns from './components/AddOns.jsx'
import Facility from './components/Facility.jsx'
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

const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
}

/**
 * 페이지 정보 위계 (한 화면에 하나의 질문만)
 *   01 HERO           이게 뭔데? / 얼마인데?
 *   02 WHY            왜 바꾸는데?
 *   03 SUBSCRIPTION   구독제가 뭔데?
 *   04 PRODUCT        어떤 방식으로 이용할 건데?
 *   05 STORE          어디에서 운동할 건데?
 *   06 SELECTED STORE 내가 고른 지점은 어떤 곳인데?
 *   07 OPTIONS        추가로 필요한 게 있나?
 *   08 FACILITY       시설은 어떤데?
 *   09 BENEFIT        정리하면?
 *   10 OPEN EVENT     다른 선택지는?
 *   11 HOW TO USE     어떻게 시작해?
 *   12 FAQ            궁금한 건?
 *   13 FINAL CTA      결정
 */
export default function App() {
  useReveal()

  const [selectedStoreId, setSelectedStoreId] = useState(null)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const selectedStore = useMemo(
    () => (selectedStoreId ? getStore(selectedStoreId) : null),
    [selectedStoreId],
  )
  const selectedProduct = useMemo(
    () => (selectedProductId ? getProduct(selectedProductId) : null),
    [selectedProductId],
  )

  /** 하단 고정 CTA · FINAL CTA 대표 가격 */
  const displayPrice = useMemo(() => {
    // 월 구독이 아닌 상품을 고른 경우 그 상품 가격을 보여준다
    if (selectedProduct && selectedProduct.price !== null && !selectedProduct.storePriceAware) {
      return selectedProduct.price
    }
    return monthlyPriceFor(selectedStore, BASE_MONTHLY_PRICE)
  }, [selectedProduct, selectedStore])

  const sheetPrice = useMemo(() => {
    if (!selectedProduct) return monthlyPriceFor(selectedStore, BASE_MONTHLY_PRICE)
    return productPriceFor(selectedProduct, selectedStore, BASE_MONTHLY_PRICE)
  }, [selectedProduct, selectedStore])

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
      store_name: store.name,
      brand: store.brand.key,
    })
    // 선택 즉시 상세 영역으로 이동 — 고른 지점이 어떤 곳인지 바로 확인시킨다
    window.setTimeout(() => scrollToId('selected-store'), 120)
  }, [])

  const handleSelectProduct = useCallback(
    (product) => {
      setSelectedProductId(product.id)
      track(EVENTS.PRODUCT_SELECT, {
        product_id: product.id,
        product_name: product.name,
        price: productPriceFor(product, selectedStore, BASE_MONTHLY_PRICE),
      })

      if (product.ctaIntent === 'consult') {
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
        <Stores selectedStoreId={selectedStoreId} onSelectStore={handleSelectStore} />
        <SelectedStore store={selectedStore} onSubscribe={() => handleSubscribe('selected-store')} />
        <AddOns />
        <Facility selectedStore={selectedStore} />
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
        priceUnit={selectedProduct?.priceUnit ?? null}
        selectedStore={selectedStore}
        selectedProduct={selectedProduct}
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
