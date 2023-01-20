import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useUrlStore = create(
    persist(
        (setState) => ({
            urls: [],
            addUrl: (newUrl) => setState((state) => ({
                ...state,
                urls: [...state.urls, newUrl]
            })),
            removeUrl: (id) => setState(state => ({
                ...state,
                urls: state.urls.filter(value => value.id !== id)
            }))
        }),
        {
            name: "urlsSaved"
        }
    )
)