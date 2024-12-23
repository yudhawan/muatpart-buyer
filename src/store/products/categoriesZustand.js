import { create } from "zustand";
const dumcat = [
    {
      id: '1',
      value: 'electronics',
      children: [
        {
          id: '1.1',
          value: 'phones',
          children: [
            {
              id: '1.1.1',
              value: 'smartphones',
              children: [
                { id: '1.1.1.1', value: 'iPhone' },
                { id: '1.1.1.2', value: 'Samsung Galaxy' }
              ]
            },
            {
              id: '1.1.2',
              value: 'feature phones',
              children: [
                { id: '1.1.2.1', value: 'Nokia 3310' },
                { id: '1.1.2.2', value: 'Motorola Razr' }
              ]
            }
          ]
        },
        {
          id: '1.2',
          value: 'laptops',
          children: [
            {
              id: '1.2.1',
              value: 'gaming laptops',
              children: [
                { id: '1.2.1.1', value: 'Alienware' },
                { id: '1.2.1.2', value: 'Razer Blade' }
              ]
            },
            {
              id: '1.2.2',
              value: 'business laptops',
              children: [
                { id: '1.2.2.1', value: 'Dell XPS' },
                { id: '1.2.2.2', value: 'MacBook Pro' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '2',
      value: 'vehicles',
      children: [
        {
          id: '2.1',
          value: 'cars',
          children: [
            {
              id: '2.1.1',
              value: 'sedans',
              children: [
                { id: '2.1.1.1', value: 'Toyota Corolla' },
                { id: '2.1.1.2', value: 'Honda Accord' }
              ]
            },
            {
              id: '2.1.2',
              value: 'SUVs',
              children: [
                { id: '2.1.2.1', value: 'Ford Explorer' },
                { id: '2.1.2.2', value: 'Jeep Cherokee' }
              ]
            }
          ]
        },
        {
          id: '2.2',
          value: 'motorcycles',
          children: [
            {
              id: '2.2.1',
              value: 'cruisers',
              children: [
                { id: '2.2.1.1', value: 'Harley Davidson' },
                { id: '2.2.1.2', value: 'Indian Scout' }
              ]
            },
            {
              id: '2.2.2',
              value: 'sport bikes',
              children: [
                { id: '2.2.2.1', value: 'Yamaha R1' },
                { id: '2.2.2.2', value: 'Kawasaki Ninja' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '3',
      value: 'furniture',
      children: [
        {
          id: '3.1',
          value: 'living room',
          children: [
            {
              id: '3.1.1',
              value: 'sofas',
              children: [
                { id: '3.1.1.1', value: 'Sectional Sofa' },
                { id: '3.1.1.2', value: 'Recliner' }
              ]
            },
            {
              id: '3.1.2',
              value: 'coffee tables',
              children: [
                { id: '3.1.2.1', value: 'Glass Coffee Table' },
                { id: '3.1.2.2', value: 'Wooden Coffee Table' }
              ]
            }
          ]
        },
        {
          id: '3.2',
          value: 'bedroom',
          children: [
            {
              id: '3.2.1',
              value: 'beds',
              children: [
                { id: '3.2.1.1', value: 'King Size Bed' },
                { id: '3.2.1.2', value: 'Queen Size Bed' }
              ]
            },
            {
              id: '3.2.2',
              value: 'wardrobes',
              children: [
                { id: '3.2.2.1', value: 'Sliding Door Wardrobe' },
                { id: '3.2.2.2', value: 'Hinged Door Wardrobe' }
              ]
            }
          ]
        }
      ]
    }
  ]
export const categoriesZustand = create((set,get)=>({
    categories:dumcat,
    categoryFamily:[],
    getSubAndItem:[],
    setCategories:val=>set({categories:val}),
    generateCategoryFamily:val=>{
        let index=0
        let container = get()?.categories
        let tmp = []
        function generate(data) {
            for (let i = 0; i < data?.length; i++) {
                if(data[i]['id']===val[index]){
                    index++
                    tmp.push({
                        id:data[i]['id'],
                        value:data[i]['value']
                    })
                    if((val.length-1)==index){
                        set({categoryFamily:tmp})
                    }
                    if((val.length-1)<=index){
                        generate(data[i]['children'])
                    }
                }
            }
        }
        generate(container)
    },
    setSubAndItem:(val)=>set({getSubAndItem:val})
}))