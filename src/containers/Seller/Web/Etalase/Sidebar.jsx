import { Fragment } from 'react';

const Sidebar = ({ 
  categories = [], 
  showcases = [],
  selectedOption = null, // Will be in format { type: 'showcase'|'category', value: string }
  onSelect
}) => {
  return (
    <div className="flex flex-col w-[264px] gap-y-6">
      {/* Showcases Section */}
      <div className="flex overflow-hidden flex-col justify-center p-4 max-w-full bg-white rounded-md border border-solid border-neutral-400 w-[264px]">
        <div className="flex flex-col w-full gap-y-4">
          <div className="flex-1 shrink gap-2 self-stretch w-full font-bold text-[20px] leading-[24px] whitespace-nowrap">
            Etalase
          </div>
          {showcases.map((showcase, index) => (
            <Fragment key={index}>
              <div className={index < showcases.length - 1 ? "border-b-neutral-400 border-b pb-4" : ""}>
                <div className={`${selectedOption?.type === 'showcase' && selectedOption?.value === showcase 
                    ? 'text-[#C22716]' : ''}
                    py-2 relative
                  `}
                >
                  <div
                    onClick={() => onSelect?.({ type: 'showcase', value: showcase })}
                    className={`flex gap-2 items-center px-4 w-full 
                       bg-white cursor-pointer
                      `}
                  >
                    <div className="z-0 flex-1 shrink my-auto basis-0 font-semibold text-[12px] leading-[14.4px]">
                      {showcase}
                    </div>
                  </div>
                  {selectedOption?.type === 'showcase' && selectedOption?.value === showcase && (
                      <div className="flex absolute top-[4px] left-0 z-0 shrink-0 self-start w-1 h-6 bg-[#C22716] rounded-none" />
                    )}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Categories Section GA JADI SAYA KECEWA SUDAH SUSAH2 BUAT!!!*/}
      {/* <div className="flex overflow-hidden flex-col justify-center p-4 max-w-full bg-white rounded-md border border-solid border-neutral-400 w-[264px]">
        <div className="flex flex-col w-full gap-y-4">
          <div className="flex-1 shrink gap-2 self-stretch w-full font-bold text-[20px] leading-[24px] whitespace-nowrap">
            Kategori
          </div>
          {categories.map((category, index) => (
            <Fragment key={index}>
              <div className={index < categories.length - 1 ? "border-b-neutral-400 border-b pb-4" : ""}>
                <div className={`${selectedOption?.type === 'category' && selectedOption?.value === category 
                    ? 'text-[#C22716]' : ''}
                    py-2 relative
                  `}
                >
                  <div
                    onClick={() => onSelect?.({ type: 'category', value: category })}
                    className={`flex gap-2 items-center px-4 w-full 
                       bg-white cursor-pointer
                      `}
                  >
                    <div className="z-0 flex-1 shrink my-auto basis-0 font-semibold text-[12px] leading-[14.4px]">
                      {category}
                    </div>
                  </div>
                  {selectedOption?.type === 'category' && selectedOption?.value === category && (
                      <div className="flex absolute top-[4px] left-0 z-0 shrink-0 self-start w-1 h-6 bg-[#C22716] rounded-none" />
                    )}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;