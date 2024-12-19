import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import IconComponent from "@/components/IconComponent/IconComponent";

export default function RatingFilter() {
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
              4.9
              <span className="font-medium text-[14px] leading-[16.8px] text-neutral-600">
                /5.0
              </span>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="font-medium text-[12px] leading-[14.4px] text-neutral-700">103 rating</div>
            <div className="size-0.5 bg-neutral-700" />
            <div className="font-medium text-[12px] leading-[14.4px] text-neutral-700">103 ulasan</div>
          </div>
        </div>
        <RatingBars />
      </div>
      <FilterSection />
    </div>
  );
}

function RatingBars() {
  const ratings = [
    { stars: 5, count: 99, width: "86px" },
    { stars: 4, count: 20, width: "56px" },
    { stars: 3, count: 20, width: "17px" },
    { stars: 2, count: 20, width: "12px" },
    { stars: 1, count: 0, width: "0px" }
  ];

  return (
    <div className="flex flex-col mt-4 w-full text-xs font-medium text-black whitespace-nowrap">
      {ratings.map((rating) => (
        <div key={rating.stars} className="flex relative gap-2 justify-center items-center mt-3 w-full">
          {/* <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/021d257a01a743aa4932533e57bc83f0e937b4e6f5d7ab722135c183786c5276?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&"
            alt=""
            className="object-contain z-0 shrink-0 self-stretch my-auto w-3 aspect-square"
          /> */}
          <IconComponent
            src="/icons/star.svg"
            width={12}
            height={12}
          />
          <div className="z-0 self-stretch my-auto font-medium text-[12px] leading-[14.4px]">{rating.stars}</div>
          {/* <div className="flex z-0 shrink-0 self-stretch my-auto h-1.5 rounded-xl bg-[#D9D9D9] w-[99px]" /> */}
          <div className="self-center relative h-1.5 w-full bg-[#D9D9D9] rounded-xl overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-[#C22716]"
              style={{ width: rating.width }}
            />
          </div>
          <div className="z-0 self-stretch my-auto w-[15px] font-medium text-[12px] leading-[14.4px]">{rating.count}</div>
          {/* {rating.count > 0 && (
            <div 
              className="flex absolute left-9 z-0 shrink-0 self-start h-1.5 bg-red-700 rounded-xl bottom-[3px]" 
              style={{width: rating.width}}
            />
          )} */}
        </div>
      ))}
    </div>
  );
}

function FilterSection() {
  const ratingOptions = [5, 4, 3, 2, 1].map(stars => ({
    id: `rating-${stars}`,
    label: `${stars} Bintang`
  }));

  return (
    <div className="flex overflow-hidden flex-col p-4 mt-6 w-full bg-white rounded-md border border-solid border-neutral-400 max-w-[264px]">
      <div className="flex flex-col w-full">
        <div className="flex-1 shrink gap-2 self-stretch w-full font-bold text-[20px] leading-[24px] whitespace-nowrap">
          Filter
        </div>
        <div className="flex flex-col mt-4 w-full">
          <div className="flex flex-col items-start pb-4 w-full border-b border-solid border-b-neutral-400">
            <div className="flex justify-between items-center self-stretch w-full whitespace-nowrap">
              <div className="self-stretch my-auto font-semibold text-[12px] leading-[14.4px]">Rating</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/ad7b5eca32e81f6e8812c7c8179eba8826271728d957dcdaed42f4e0ce7888ce?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
            </div>
            {ratingOptions.map(option => (
              <div key={option.id} className="flex gap-2 justify-center items-center mt-4">
                  {/* <input
                    type="checkbox"
                    id={option.id}
                    className="flex shrink-0 w-4 h-4 rounded border border-solid border-neutral-500"
                  /> */}
                  <Checkbox
                    // checked={value?.checked}
                    // name={option.name}
                    // onChange={onChange}
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
                {/* <label htmlFor={option.id} className="flex gap-1 items-center self-stretch my-auto text-xs font-medium leading-tight text-black">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/021d257a01a743aa4932533e57bc83f0e937b4e6f5d7ab722135c183786c5276?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&"
                    alt=""
                    className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
                  />
                  <div className="self-stretch my-auto">{option.label}</div>
                </label> */}
              </div>
            ))}
          </div>
          <div className="flex flex-col mt-4 w-full">
            <div className="flex gap-10 justify-between items-center w-full whitespace-nowrap">
              <div className="self-stretch my-auto font-semibold text-[12px] leading-[14.4px]">Dokumentasi</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/ad7b5eca32e81f6e8812c7c8179eba8826271728d957dcdaed42f4e0ce7888ce?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
            </div>
            <div className="flex gap-2 items-center mt-4 w-full">
              {/* <div className="flex flex-col self-stretch my-auto w-4">
                <input
                  type="checkbox"
                  id="with-media"
                  className="flex shrink-0 w-4 h-4 rounded border border-solid border-neutral-500"
                />
              </div>
              <label
                htmlFor="with-media"
                className="flex-1 shrink self-stretch my-auto text-xs font-medium leading-tight text-black basis-0"
              >
                Dengan Gambar/Video
              </label> */}
              <Checkbox
                // checked={value?.checked}
                // name={option.name}
                // onChange={onChange}
                label={<span className="font-medium text-[12px] leading-[14.4px]">Dengan Gambar/Video</span>} 
              />
            </div>
          </div>
        </div>
      </div>
      <Button
          Class="mt-6 h-8 px-[98px]"
          color="primary_secondary"
          onClick={() => alert("reset")}
        >
          <span className="font-semibold text-[14px] leading-[16.8px] text-primary-700">Reset</span>
        </Button>
    </div>
  );
}