import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { v4 as uuidv4 } from "uuid";

interface TicketTime {
  startTime: string;
  endTime: string;
}

interface Ticket {
  id: string;
  from: string;
  to: string;
  company: string;
  price: number;
  currency: "RUB";
  time: TicketTime;
  duration: number;
  date: string;
  connectionAmount: number | null;
}

interface TicketsState {
  tickets: Ticket[];
  status: "idle" | "loading" | "failed";
  sort: "price" | "duration" | "connections";
  filters: {
    transfers: number[];
    companies: string[];
  };
}

const initialState: TicketsState = {
  tickets: [],
  status: "idle",
  sort: "price",
  filters: {
    transfers: [],
    companies: [],
  },
};

const companies: string[] = ["Pobeda", "Red Wings", "S7 Airlines"];
const airportCodes: string[] = ["ASF", "BAX", "VVO", "VOG", "VOZ", "GRV", "SVX", "IKT", "KZN", "KGD", "KEJ", "KRR", "KJA", "MRV", "VKO", "DME", "SVO", "ZIA", "MMK", "NJC", "GOJ", "OVB", "OMS", "PEE", "PKC", "ROV", "KUF", "LED", "RTW", "AER", "STW", "SGC", "TJM", "UFA", "KHV", "HMA", "CEK", "UUS"];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomTime(): string {
  const pad = (n: number) => (n < 10 ? "0" + n : n.toString());
  const hour = pad(Math.floor(Math.random() * 24));
  const minute = pad(Math.floor(Math.random() * 60));
  return `${hour}:${minute}`;
}

function generateRandomPrice(): number {
  let price: number;
  do {
    price = Math.floor(Math.random() * 20000);
  } while (price <= 10000);
  return price;
}

function loadTicketsFromLocalStorage(): Ticket[] {
  const ticketsData = localStorage.getItem("tickets");
  if (ticketsData) {
    try {
      const tickets = JSON.parse(ticketsData);
      return tickets;
    } catch (error) {
      console.error("Error parsing tickets from LocalStorage:", error);
    }
  }
  return [];
}

const savedTickets = loadTicketsFromLocalStorage();
const initialTickets: Ticket[] = savedTickets.length
  ? savedTickets
  : Array.from({ length: 50 }, () => ({
      id: uuidv4(),
      from: getRandomElement(airportCodes),
      to: getRandomElement(airportCodes),
      company: getRandomElement(companies),
      price: generateRandomPrice(),
      currency: "RUB" as const,
      time: {
        startTime: generateRandomTime(),
        endTime: generateRandomTime(),
      },
      duration: Math.floor(Math.random() * 300) + 60,
      date: new Date().toISOString().split("T")[0],
      connectionAmount: Math.floor(Math.random() * 4),
    }));

localStorage.setItem("tickets", JSON.stringify(initialTickets));

export const fetchTickets = createAsyncThunk<Ticket[], void>("tickets/fetchTickets", async () => {
  return initialTickets.slice(0, 3);
});

export const fetchMoreTickets = createAsyncThunk<Ticket[], void>("tickets/fetchMoreTickets", async (_, { getState }) => {
  const state = getState() as RootState;
  const loadedTicketsCount = state.tickets.tickets.length;
  let nextIndex = loadedTicketsCount;
  const nextTickets: Ticket[] = [];
  while (nextTickets.length < 3 && nextIndex < initialTickets.length) {
    const ticket = initialTickets[nextIndex];
    if (ticket.connectionAmount !== null && state.tickets.filters.transfers.includes(ticket.connectionAmount) && state.tickets.filters.companies.includes(ticket.company)) {
      if (!state.tickets.tickets.some((t) => t.id === ticket.id)) {
        nextTickets.push(ticket);
      }
    }
    nextIndex++;
  }

  return nextTickets;
});

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<"price" | "duration" | "connections">) => {
      state.sort = action.payload;
    },
    setTransferFilter: (state, action: PayloadAction<number[]>) => {
      state.filters.transfers = action.payload;
    },
    setCompanyFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.companies = action.payload;
    },
    sortByPrice: (state) => {
      state.tickets.sort((a, b) => a.price - b.price);
    },
    sortByDuration: (state) => {
      state.tickets.sort((a, b) => a.duration - b.duration);
    },
    sortByOptimal: (state) => {
      state.tickets.sort((a, b) => {
        const aScore = a.connectionAmount! * 1000 + a.duration;
        const bScore = b.connectionAmount! * 1000 + b.duration;
        return aScore - bScore;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = "idle";
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchMoreTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMoreTickets.fulfilled, (state, action) => {
        state.status = "idle";
        state.tickets = [...state.tickets, ...action.payload];
      })
      .addCase(fetchMoreTickets.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectTickets = (state: RootState) => state.tickets.tickets;
export const selectStatus = (state: RootState) => state.tickets.status;

export default ticketsSlice.reducer;
export const { setSort, setTransferFilter, setCompanyFilter, sortByPrice, sortByDuration, sortByOptimal } = ticketsSlice.actions;
