import ReviewList from './components/reviews/ReviewList';

function App() {
   return (
      <div className="p-4 h-screen w-full">
         <ReviewList productId={3} />
      </div>
   );
}

export default App;
