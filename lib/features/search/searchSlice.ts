import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchSearch } from "./searchAPI";

export interface SearchSliceState {
    value: string;
    status: "idle" | "loading" | "failed";
    weather: any;
    forecast: any;
}

const initialState: SearchSliceState = {
    value: "",
    status: "idle",
    weather: null,
    forecast: null,
};

export const searchSlice = createAppSlice({
    name: "search",
    initialState,
    reducers: (create) => ({
        search: create.asyncThunk(
            async (value: string) => {
                const { responseWeather, responseForecast }: any = await fetchSearch(value);
                return { value, weather: responseWeather, forecast: responseForecast };
            },
            {
                pending: (state) => {
                    state.status = "loading";
                },
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.value = action.payload.value;
                    state.weather = action.payload.weather;
                    state.forecast = action.payload.forecast;
                },
                rejected: (state) => {
                    state.status = "failed";
                },
            },
        ),
    }),
    selectors: {
        selectSearch: (search) => search.value,
        selectStatus: (search) => search.status,
        selectWeather: (search) => search.weather,
        selectForecast: (search) => search.forecast,
    },
});

export const { search } = searchSlice.actions;
export const { selectSearch, selectStatus, selectWeather, selectForecast } = searchSlice.selectors;
