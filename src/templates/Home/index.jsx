import { Component } from "react";

import "./styles.css";

import { Button } from "../../components/Button";
import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
  };

  // Pegando os posts e fotos
  loadPosts = async () => {
    const { page, postsPerPage } = this.state; // Pegando os status para fazer a paginação
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  // Fazendo a paginação
  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
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
    const { posts, page, postsPerPage, allPosts } = this.state;
    // Checando se tem mais posts
    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
      <section className="container">
        <Posts posts={posts} />

        <div className="button-container">
          <Button
            text="Load more posts"
            onClick={this.loadMorePosts}
            disabled={noMorePosts}
          />
        </div>
      </section>
    );
  }
}
