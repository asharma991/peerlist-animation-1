import './App.css'
import SideMenu from './components/SideMenu'

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-white">
      <SideMenu />
      <div className="flex items-center justify-center h-full">
        <h1 className="text-lg">
          Open the menu in the top left corner
        </h1>
      </div>
    </div>
  )
}

export default App
