import { Component } from "react";
import "./App.css";
import { PostCard } from "./components/PostCard";

class App extends Component {
  state = {
    posts: [],
    photos: [],
  };

  // Pegando os posts e fotos
  loadPosts = async () => {
    const postsResponse = fetch("https://jsonplaceholder.org/posts");
    const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    // Pegando uma foto por post
    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url };
    });

    this.setState({ posts: postsAndPhotos });
  };

  // componentDidMount() É invocado imediatamente após um componente ser montado (inserido na árvore/exibido na página). Inicializações que exijam nós do DOM devem vir aqui. Se precisar carregar data de um endpoint remoto, este é um bom lugar para instanciar sua requisição.
  componentDidMount() {
    this.loadPosts();
  }

  // componentDidUpdate() é invocado imediatamente após alguma atualização ocorrer. Este método não é chamado pelo initial render
  componentDidUpdate() {}

  // componentWillUnmount() é invocado imediatamente antes que um componente seja desmontado e destruído. Qualquer limpeza necessária deve ser realizada neste método, como invalidar timers, cancelar requisições de rede, ou limpar qualquer subscrição que foi criada no componentDidMount().
  componentWillUnmount() {}

  render() {
    const { posts } = this.state;

    return (
      <section className="container">
        <div className="posts">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              cover={post.cover}
              body={post.content}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default App;
