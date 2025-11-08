import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export type Address = {
    id:string; 
    type: 'Home' | 'Work' | 'Other';
    name:string; 
    mobile:string;
    flatNo:string;
    blockName:string; 
    buildingName:string; 
    street:string; 
    landmark:string; 
    pincode:string; 
    locality:string;
}

type AddressState = {
    addresses: Address[];
    selectedAddressId: string | null;
    addAddress: (address:Omit<Address, 'id'>) => void;
    updateAddress: (id:string, address: Partial<Address>) => void;
    removeAddress: (id:string) => void;
    selectAddress: (id:string) => void;
}

export const useAddressStore = create<AddressState>() (
    persist<AddressState>(
        (set, get) => ({
            addresses: [
                {
                    id: '1',
                    type: 'Home',
                    name: 'John Doe',
                    mobile: '+91 9876543210',
                    flatNo: '101',
                    blockName: 'A',
                    buildingName: 'Sunshine Apartments',
                    street: 'MG Road',
                    landmark: 'Near Central Park',
                    pincode: '560001',
                    locality: 'Bangalore'
                }, {
                    id: '2',
                    type: 'Work',
                    name: 'John Doe',
                    mobile: '+91 9876543210',
                    flatNo: '502',
                    blockName: 'B',
                    buildingName: 'Tech Park',
                    street: 'Electronic City',
                    landmark: 'Opposite to Cafe Coffee Day',
                    pincode: '560100',
                    locality: 'Bangalore'
                }
            ], 
            selectedAddressId: '1', 
            addAddress: (newAddress) => {
                const id = Date.now().toString();
                set((state) => ({
                    addresses: [...state.addresses, {...newAddress, id}]
                }))
            }, 
            updateAddress: (id, updated) => {
                set((state) => ({
                    addresses: state.addresses.map(addr => addr.id === id ? {...addr, ...updated} : addr)
                }))
            }, 
            removeAddress: (id) => {
                set((state) => ({
                    addresses: state.addresses.filter(addr => addr.id !== id),
                }))
            }, 
            selectAddress: (id) => set({ selectedAddressId: id})
        }), {
            name: 'address-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    ) 
) 