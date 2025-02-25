import { Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import ShowUser from './pages/ShowUser'
import ExpensiveCalculationComponent from './pages/ExpensiveCalculationComponent'
import CallbackExample from './pages/CallbackExample'
import RefElement from './pages/RefElement'
import Contador from './pages/Contador'
import ThemedComponent, { ThemeProvider } from './components/ThemedComponent'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Counter from './components/Counter'
import CounterButton from './components/CounterButton'

function App() {
  return (
    <>
      <img 
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDI1MCAyNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNmExMWNiO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMyNTc1ZmM7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8Y2lyY2xlIGN4PSIxMjUiIGN5PSIxMjUiIHI9IjExMCIgZmlsbD0idXJsKCNid0dyYWRpZW50KSIgLz4KICA8Y2lyY2xlIGN4PSIxMjUiIGN5PSIxNDUiIHI9IjE4IiBmaWxsPSJ3aGl0ZSIgLz4KICA8bGluZSB4MT0iMTM5IiB5MT0iMTQ1IiB4Mj0iMTM5IiB5Mj0iOTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogIDxwYXRoIGQ9Ik0xMzksOTAgQzE0NSw4MCAxNjAsODAgMTY1LDk1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjYiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICA8dGV4dCB4PSIxMjUiIHk9IjIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyOCIgZm9udC13ZWlnaHQ9ImJvbGQiPgogICAgZ3JvdXBpZQogIDwvdGV4dD4KPC9zdmc+"
        alt="groupie logo" 
        style={{ maxWidth: "100%", height: "auto" }}
      />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/showuser" element={<ShowUser />} />
        <Route path="/expensive" element={<ExpensiveCalculationComponent />} />
        <Route path="/callback" element={<CallbackExample />} />
        <Route path="/ref" element={<RefElement />} />
        <Route path="/contador" element={<Contador />} />
      </Routes>

      <ThemeProvider>
        <ThemedComponent />
      </ThemeProvider>

    <Provider store={store}>
      <Counter />
      <CounterButton />
    </Provider>
    </>
  )
}

export default App
