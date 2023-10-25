import { Component } from "react";

import "./styles.css";

import { Button } from "../../components/Button";
import { Posts } from "../../components/Posts";
import { TextInput } from "../../components/TextInput";
import { loadPosts } from "../../utils/load-posts";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: "",
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

  // Pegando o valor do input
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    // Checando se tem mais posts
    const noMorePosts = page + postsPerPage >= allPosts.length;

    // Se tiver valor no searchValue eu irei filtrar os posts retornado todos os posts que contem o searchValue se nao tiver valor irei retornar os posts normais
    const filteredPosts = searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          {/* Checando se existe um valor em searchValue */}
          {searchValue && <h1>Search value: {searchValue}</h1>}
          <TextInput
            handleChange={this.handleChange}
            searchValue={searchValue}
          />
        </div>

        {/* Checando se existem posts depois de filtrar */}
        {filteredPosts.length > 0 ? (
          <Posts posts={filteredPosts} />
        ) : (
          <p>Não existem posts</p>
        )}

        <div className="button-container">
          {/* Se o searchValue for true o botão não será exibido */}
          {!searchValue && (
            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
