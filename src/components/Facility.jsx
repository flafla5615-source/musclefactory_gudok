import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { DEFAULT_PHOTO_STORE } from '../data/stores.js'

/**
 * STEP 7 — 시설은 어떤데?
 *
 * 선택한 지점의 실사진을 보여준다. 선택 지점에 사진이 없으면
 * 사진이 등록된 지점으로 대체해 보여주고 어느 지점인지 명시한다.
 *
 * ⚠ 사진이 없다고 AI 생성·스톡 이미지를 넣지 않는다.
 * ⚠ 모든 사진은 aspect-ratio 4/3 + object-fit: cover 로 통일한다.
 *    (사진 자체는 변형하지 않는다)
 */
export default function Facility({ selectedStore }) {
  const hasOwnPhotos = selectedStore && selectedStore.images.length > 0
  const source = hasOwnPhotos ? selectedStore : DEFAULT_PHOTO_STORE
  const images = source ? source.images : []

  return (
    <Section
      id="facility"
      title={
        <>
          매일 다닐 곳이니까,
          <br />
          시설도 직접 확인하세요.
        </>
      }
      description={
        images.length > 0
          ? `${source.name} 실제 촬영 사진입니다.`
          : '실제 센터사진은 촬영 후 순차적으로 공개됩니다.'
      }
    >
      {images.length > 0 ? (
        <>
          <Reveal className="rail">
            {images.map((image, i) => (
              <figure
                key={image.src}
                className="w-[78%] flex-shrink-0 sm:w-[52%] lg:w-[32%]"
              >
                <div className="media">
                  <img
                    src={image.src}
                    alt={`${source.name} ${image.category}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <figcaption className="mt-2.5 text-[12.5px] font-medium text-mute">
                  {image.category}
                </figcaption>
              </figure>
            ))}
          </Reveal>

          {selectedStore && !hasOwnPhotos && (
            <Reveal delay={100} className="mt-5">
              <p className="t-caption">
                {selectedStore.name} 실사진은 준비 중입니다. 현재는 {source.name} 사진을 보여드리고
                있습니다.
              </p>
            </Reveal>
          )}
        </>
      ) : (
        <Reveal className="card items-center !py-12 text-center">
          <p className="t-caption">준비되는 대로 실제 촬영 사진을 공개합니다.</p>
        </Reveal>
      )}
    </Section>
  )
}
