import IconComponent from "@/components/IconComponent/IconComponent"
import Input from "@/components/Input/Input"
import registerForm from "@/store/registerForm";
import { useMemo, useState } from "react"


const SelectBankResponsive = ({
	bankOptions,
	isOpen,
	setIsOpen
}) => {
	const {
    handleInputChange,
  } = registerForm();
	const [search, setSearch] = useState("")

	const groupedBankOptions = useMemo(() => {
		const filteredBankOptions = bankOptions.filter(bank => bank.name.toLowerCase().includes(search.toLowerCase()))

		// Create an object to store groups
		const grouped = {};
	
		// Iterate over each object
		filteredBankOptions.forEach(obj => {
			const firstLetter = obj.name[0]; // Get the first letter of the label
	
			// If the group doesn't exist, create it
			if (!grouped[firstLetter]) {
				grouped[firstLetter] = [];
			}
	
			// Push the object to the appropriate group
			grouped[firstLetter].push(obj);
		});
	
		// Transform the grouped object into the desired array of objects
		return Object.keys(grouped).map(key => ({ key, items: grouped[key] }));
	}, [bankOptions, search])

	return (
		<div className={`${isOpen ? "" : "hidden"} absolute top-0 left-0 z-[90] bg-neutral-50 min-h-screen w-full`}>
			<div className="py-5 px-4">
				<Input
					name="ktpName"
					type="text"
					placeholder="Cari Nama Bank"
					width={{ width: "100%" }}
					changeEvent={(e) => setSearch(e.target.value)}
					value={search}
					icon={{
						left: <IconComponent src="/icons/search.svg" />,
						right: search ? (
							<IconComponent
								onclick={() => setSearch("")}
								src="/icons/silang.svg"
							/>
						) : null
					}}
				/>
				<div className="mt-5 flex flex-col gapy-y-[18px]">
					{groupedBankOptions.map((item, key) => (
						<div className="flex flex-col gap-y-4" key={key}>
							<span className="font-bold text-[16px] leading-[17.6px]">{item.key}</span>
							{item.items.map((bank, index) => {
								const isLastChild = item.items.length - 1 === index
								return (
									<div
										className={`font-semibold text-[14px] leading-[15.4px] text-neutral-600 cursor-pointer
											${isLastChild ? "" : "border-b border-b-neutral-500 pb-4"}	
										`}
										key={index}
										onClick={() => {
											handleInputChange("bankID", bank.value)
											setIsOpen(false)
										}}
									>
										{bank.name}
									</div>
								)
							})}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default SelectBankResponsive