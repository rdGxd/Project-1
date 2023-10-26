import { useCallback, useEffect, useState } from "react";

import "./styles.css";

import { Button } from "../../components/Button";
import { Posts } from "../../components/Posts";
import { TextInput } from "../../components/TextInput";
import { loadPosts } from "../../utils/load-posts";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  // Carregando os Posts
  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  // Fazendo a paginação
  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  // Pegando o valor do input
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  // Se as dependências mudarem entre as renderizações, o useEffect executará a função de retorno de chamada
  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [postsPerPage, handleLoadPosts]);

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
        {/* Checando se existe um valor em searchValue e exibindo ele */}
        {searchValue && <h1>Search value: {searchValue}</h1>}
        <TextInput handleChange={handleChange} searchValue={searchValue} />
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
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};
