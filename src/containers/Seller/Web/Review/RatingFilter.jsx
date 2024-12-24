import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import IconComponent from "@/components/IconComponent/IconComponent";
import { useState } from "react";

export default function RatingFilter({
  storeRating,
  totalRatings,
  totalReviews,
  ratingCounts,
  filter,
  setFilter,
}) {
  return (
    <div className="flex flex-col min-w-[240px] w-[264px]">
      <div className="flex flex-col w-40 max-w-full">
        <div className="flex flex-col w-full gap-y-3.5">
          <div className="font-semibold text-[18px] leading-[21.6px]">
            Ulasan Pembeli
          </div>
          <div className="flex gap-2 items-center w-full">
            <IconComponent
              src="/icons/star.svg"
              width={12}
              height={12}
            />
            <div className="flex-1 shrink self-stretchbasis-0 font-bold text-[24px] leading-[28.8px]">
              {storeRating}
              <span className="font-medium text-[14px] leading-[16.8px] text-neutral-600">
                /5.0
              </span>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="font-medium text-[12px] leading-[14.4px] text-neutral-700">{`${totalRatings} rating`}</div>
            <div className="size-0.5 bg-neutral-700" />
            <div className="font-medium text-[12px] leading-[14.4px] text-neutral-700">{`${totalReviews} ulasan`}</div>
          </div>
        </div>
        <RatingBars ratings={ratingCounts || []} totalRatings={totalRatings} />
      </div>
      <FilterSection filter={filter} setFilter={setFilter} />
    </div>
  );
}

function RatingBars({ ratings, totalRatings }) {
  return (
    <div className="flex flex-col mt-4 w-full text-xs font-medium text-black whitespace-nowrap">
      {ratings.map((rating, key) => {
        return (
          <div key={key} className="flex relative gap-2 justify-center items-center mt-3 w-full">
            <IconComponent
              src="/icons/star.svg"
              width={12}
              height={12}
            />
            <div className="z-0 self-stretch my-auto font-medium text-[12px] leading-[14.4px]">{rating.star}</div>
            <div className="self-center relative h-1.5 w-[99px] bg-[#D9D9D9] rounded-xl overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-[#C22716]"
                style={{ width: `${rating.count / totalRatings * 99}px` }}
              />
            </div>
            <div className="z-0 self-stretch my-auto w-[15px] font-medium text-[12px] leading-[14.4px]">{rating.count}</div>
          </div>
        )
      })}
    </div>
  );
}

function FilterSection({
  filter,
  setFilter
}) {
  const [getExpanded, setExpanded] = useState(["Rating", "Dokumentasi"]);
  const ratingOptions = [5, 4, 3, 2, 1].map(stars => ({
    id: `rating-${stars}`,
    label: `${stars} Bintang`,
    value: stars
  }));

  function handleExpanded(value) {
    if (getExpanded.some(val => val === value)) {
        let tmp = getExpanded.filter(val => val !== value);
        setExpanded(tmp);
    } else {
        setExpanded(prev => [...prev, value]);
    }
}

  return (
    <div className="flex overflow-hidden flex-col p-4 mt-6 w-full bg-white rounded-md border border-solid border-neutral-400 max-w-[264px]">
      <div className="flex flex-col w-full">
        <div className="flex-1 shrink gap-2 self-stretch w-full font-bold text-[20px] leading-[24px] whitespace-nowrap">
          Filter
        </div>
        <div className="flex flex-col mt-4 w-full">
          <div className="flex flex-col items-start pb-4 w-full border-b border-solid border-b-neutral-400">
            <div
              className="flex justify-between items-center self-stretch w-full whitespace-nowrap cursor-pointer"
              onClick={() => handleExpanded("Rating")}
            >
              <div className="self-stretch my-auto font-semibold text-[12px] leading-[14.4px]">Rating</div>
              <IconComponent
                src={`${
                    getExpanded.some(a => a === 'Rating')
                        ? '/icons/chevron-up.svg'
                        : '/icons/chevron-down.svg'
                }`}
              />
            </div>
            <div
              style={{
                maxHeight: getExpanded.some(a => a === 'Rating') ? '160px' : '0px',
                overflow: 'hidden',
              }}
              className="transition-all duration-300 ease-in-out flex flex-col"
            >
              {ratingOptions.map((option, key) => {
                const checked = filter.rating.find(item => item === option.value)
                return (
                  <div key={key} className="flex gap-2 justify-center items-center mt-4">
                      {/* <input
                        type="checkbox"
                        id={option.id}
                        className="flex shrink-0 w-4 h-4 rounded border border-solid border-neutral-500"
                      /> */}
                      <Checkbox
                        checked={checked}
                        // name={option.name}
                        onChange={() => setFilter(prevState => {
                          if (prevState.rating.includes(option.value)) {
                            return {
                              ...prevState,
                              rating: prevState.rating.filter(item => item !== option.value)
                            }
                          } else {
                            return {
                              ...prevState,
                              rating: [...prevState.rating, option.value]
                            }
                          }
                        })}
                        label={
                          <div className="flex gap-x-1">
                            <IconComponent
                              src="/icons/star.svg"
                              width={12}
                              height={12}
                            />
                            <span className="font-medium text-[12px] leading-[14.4px]">{option.label}</span>
                          </div>
                        } 
                      />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col mt-4 w-full">
            <div
              className="flex gap-10 justify-between items-center w-full whitespace-nowrap cursor-pointer"
              onClick={() => handleExpanded("Dokumentasi")}
            >
              <div className="self-stretch my-auto font-semibold text-[12px] leading-[14.4px]">Dokumentasi</div>
              <IconComponent
                src={`${
                    getExpanded.some(a => a === 'Dokumentasi')
                        ? '/icons/chevron-up.svg'
                        : '/icons/chevron-down.svg'
                }`}
              />
            </div>
            <div
              style={{
                maxHeight: getExpanded.some(a => a === 'Dokumentasi') ? '34px' : '0px',
                overflow: 'hidden',
              }}
              className="transition-all duration-300 ease-in-out flex flex-col"
            >
              <div className="flex gap-2 items-center mt-4 w-full">
                <Checkbox
                  checked={filter.isWithImage}
                  onChange={({ checked }) => setFilter(prevState => ({ ...prevState, isWithImage: checked })) }
                  label={<span className="font-medium text-[12px] leading-[14.4px]">Dengan Gambar</span>} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
          Class="mt-6 h-8 px-[98px]"
          color="primary_secondary"
          onClick={() => setFilter(prevState => ({ ...prevState, rating: [], isWithImage: false }))}
        >
          <span className="font-semibold text-[14px] leading-[16.8px] text-primary-700">Reset</span>
        </Button>
    </div>
  );
}