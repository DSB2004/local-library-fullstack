import Home from "./page/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookProvider } from "./store/book.store";
import QueryProvider from "./provider/query.provider";
import Signup from "./page/signup";
import Login from "./page/login";
import { UserProvider } from "./store/user.store";
import { ToastProvider } from "./provider/toast.provider";
function App() {
  return (
    <>
      <ToastProvider>
        <QueryProvider>
          <UserProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  index
                  element={
                    <BookProvider>
                      <Home />
                    </BookProvider>
                  }
                ></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </QueryProvider>
      </ToastProvider>
    </>
  );
}

export default App;
