import { Component } from "react";

import "./App.css";

import { Posts } from "./components/Posts";
import { loadPosts } from "./utils/load-posts";

class App extends Component {
  state = {
    posts: [],
  };

  // Pegando os posts e fotos
  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos });
  };

  // componentDidMount() É invocado imediatamente após um componente ser montado (inserido na árvore/exibido na página). Inicializações que exijam nós do DOM devem vir aqui. Se precisar carregar data de um endpoint remoto, este é um bom lugar para instanciar sua requisição.
  async componentDidMount() {
    await this.loadPosts();
  }

  // componentDidUpdate() é invocado imediatamente após alguma atualização ocorrer. Este método não é chamado pelo initial render
  componentDidUpdate() {}

  // componentWillUnmount() é invocado imediatamente antes que um componente seja desmontado e destruído. Qualquer limpeza necessária deve ser realizada neste método, como invalidar timers, cancelar requisições de rede, ou limpar qualquer subscrição que foi criada no componentDidMount().
  componentWillUnmount() {}

  render() {
    const { posts } = this.state;

    return (
      <section className="container">
        <Posts posts={posts} />
      </section>
    );
  }
}

export default App;
