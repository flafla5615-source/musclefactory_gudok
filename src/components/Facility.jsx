import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { DEFAULT_PHOTO_STORE } from '../data/stores.js'

/**
 * STEP 7 — 시설은 어떤데?
 *
 * ⚠ 지점 간 사진을 절대 섞지 않는다.
 *    선택한 지점에 사진이 없으면 다른 지점 사진으로 대체하지 않고
 *    빈 자리(placeholder)로 둔다. (보건대점은 촬영 대기 중)
 *    지점 미선택 상태에서만 사진이 있는 대표 지점을 보여주고,
 *    어느 지점 사진인지 반드시 함께 표기한다.
 * ⚠ AI 생성·스톡 이미지를 넣지 않는다.
 * ⚠ 모든 사진은 aspect-ratio 4/3 + object-fit: cover 로 통일한다.
 *    (사진 자체는 변형하지 않는다)
 */
export default function Facility({ selectedStore }) {
  // 지점을 골랐으면 그 지점 사진만. 없으면 빈 상태.
  const source = selectedStore || DEFAULT_PHOTO_STORE
  const images = source ? source.facilityImages : []

  return (
    <Section
      id="facility"
      title={
        <>
          실제 운동할 공간을
          <br />
          먼저 확인하세요.
        </>
      }
      description={
        images.length > 0
          ? `${source.name} 실제 촬영 사진입니다.`
          : selectedStore
            ? `${selectedStore.name} 실사진은 촬영 후 공개됩니다.`
            : '실제 센터사진은 촬영 후 순차적으로 공개됩니다.'
      }
    >
      {images.length > 0 ? (
        <Reveal className="rail">
          {images.map((image, i) => (
            <figure key={image.src} className="w-[78%] flex-shrink-0 sm:w-[52%] lg:w-[32%]">
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
      ) : (
        <Reveal className="card items-center !py-12 text-center">
          <p className="t-caption">
            준비되는 대로 실제 촬영 사진을 공개합니다.
          </p>
        </Reveal>
      )}
    </Section>
  )
}
