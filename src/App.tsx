import About from "@/pages/About";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ResourceDetail from "@/pages/ResourceDetail";
import Resources from "@/pages/Resources";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Route, Router, Switch } from "wouter";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/resources" component={Resources} />
      <Route path="/resources/:slug" component={ResourceDetail} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <Router base={base}>
      <ScrollToTop />
      <Routes />
    </Router>
  );
}
