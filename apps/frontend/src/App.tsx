import CurrencyGrid from './CurrencyGrid';
import './styles/App.css'

// Основной компонент приложения
export function App() {
  return (
    // Обертка приложения с классом "container"
    <div className="container">
      {/* Заголовок приложения */}
      <h2 className="centered-heading">Получение гифки в зависимости от курса</h2>
      {/* Вставляем компонент CurrencyGrid, который отображает сетку валют */}
      <CurrencyGrid />
    </div>
  );
};

export default App;