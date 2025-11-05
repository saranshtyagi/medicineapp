import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'

export type CartItem = {
    id: string, 
    name: string,
    price: number, 
    imageUrl: string, 
    quantity: number,
}

type CartState = {
    items: CartItem[],
    addItem: (item: Omit<CartItem, 'quantity'>) => void,
    updateQuantity: (id: string, delta: number) => void,
    removeItem: (id: string) => void,
    clearCart: () => void,
    getTotalItems: () => number,
    getTotalPrice: () => number,
}

export const useCartStore = create<CartState>()(
    persist<CartState>(
        (set, get) => ({
            items: [],
            addItem: (newItem: Omit<CartItem, 'quantity'>) => {
                set((state:CartState) => {
                    const existingItem = state?.items.find((item) => item.id === newItem.id);
                    if(existingItem) {
                        return {
                            items:state.items.map((item) => item.id === newItem?.id ? {...item, quantity: item.quantity + 1} : item)
                        }
                    }
                    return {items: [...state.items, {...newItem, quantity: 1}]}
                })
            },
            updateQuantity: (id:string, delta: number) => {
                set((state:CartState) => {
                    const item = state.items.find((i:any) => i.id === id);
                    if(!item) return state;
                    const newQuantity = Math.max(0, item.quantity + delta);
                    if(newQuantity === 0) {
                        return {
                            items: state.items.filter((i) => i.id !== id)
                        }
                    }
                    return {
                        items: state.items.map((i) => i.id === id ? {...i, quantity: newQuantity} : i)
                    }
                })
            },
            removeItem:(id) => {
                set((state:CartState) => ({
                    items:state.items.filter((item: any) => item.id !== id)
                }))
            }, 
            clearCart: () => set({items: []}),
            getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
            getTotalPrice: () => get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        }), 
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
) 