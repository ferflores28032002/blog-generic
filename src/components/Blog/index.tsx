import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blogTopics } from "@/data/blogTopics.data";
import { Menu, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import Questions from "../Questions";

export default function Blog() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof blogTopics>([]);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = scrollTop / docHeight;
      setReadingProgress(scrollPercent * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const normalizeText = (text: string) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  useEffect(() => {
    if (searchTerm) {
      const normalizedSearchTerm = normalizeText(searchTerm);
      const results = blogTopics.filter(
        (topic) =>
          normalizeText(topic.title).includes(normalizedSearchTerm) ||
          normalizeText(topic.content).includes(normalizedSearchTerm) ||
          normalizeText(topic.category).includes(normalizedSearchTerm)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSidebarItemClick = (id: number) => {
    setSelectedTopic(id);
    setIsSidebarOpen(false);
  };

  const SidebarContent = () => (
    <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
      <div className="grid grid-flow-row auto-rows-max text-sm">
        {blogTopics.map((topic) => (
          <button
            key={topic.id}
            className={`flex w-full items-center rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              selectedTopic === topic.id
                ? "bg-gray-100 dark:bg-gray-700 font-medium  "
                : ""
            }`}
            onClick={() => handleSidebarItemClick(topic.id)}
          >
            <span className="flex-1 text-left">{topic.title}</span>
          </button>
        ))}
      </div>
    </ScrollArea>
  );

  const renderContent = () => {
    if (searchTerm) {
      return (
        <Tabs defaultValue="results" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="results">Resultados de búsqueda</TabsTrigger>
            <TabsTrigger value="content" disabled={!selectedTopic}>
              Contenido actual
            </TabsTrigger>
          </TabsList>
          <TabsContent value="results">
            <h2 className="text-2xl font-bold mb-4">
              Resultados de búsqueda para "{searchTerm}"
            </h2>
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((topic) => (
                  <Card
                    key={topic.id}
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => setSelectedTopic(topic.id)}
                  >
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {topic.content.substring(0, 150)}...
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No se encontraron resultados para "{searchTerm}"</p>
            )}
          </TabsContent>
          <TabsContent value="content">{renderSelectedTopic()}</TabsContent>
        </Tabs>
      );
    } else if (selectedTopic) {
      return renderSelectedTopic();
    } else {
      return (
        <div className="prose dark:prose-invert">
          <h2 className="text-3xl font-bold mb-4">
            Bienvenido al Blog de Metodología Ágil SCRUM
          </h2>
          <p className="mb-4">
            Explora los diferentes temas en el menú lateral para aprender todo
            sobre Scrum, desde sus fundamentos hasta técnicas avanzadas de
            implementación.
          </p>
          <h3 className="text-2xl font-semibold mb-2">¿Por qué Scrum?</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Mejora la colaboración en equipo</li>
            <li>Aumenta la productividad y la calidad del producto</li>
            <li>Permite una adaptación rápida a los cambios</li>
            <li>Fomenta la innovación y la mejora continua</li>
          </ul>
          <p>
            Comienza tu viaje en Scrum seleccionando un tema del menú lateral o
            utilizando la barra de búsqueda. ¡Descubre cómo esta metodología
            ágil puede transformar tu forma de trabajar!
          </p>
        </div>
      );
    }
  };

  const renderSelectedTopic = () => {
    if (!selectedTopic) return null;
    const topic = blogTopics[selectedTopic - 1];
    return (
      <article className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold m-0 -mb-3">{topic.title}</h2>
        {renderParagraphs(topic.content)}

        <h3 className="text-2xl font-semibold mb-4 mt-6">Videos</h3>
        <div className="space-y-6">
          {topic.videos.map((video, index) => (
            <iframe
              key={index}
              width="100%"
              height="355"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="pb-6"
            ></iframe>
          ))}
        </div>

        <h3 className="text-2xl font-semibold mb-4 mt-6">Bibliografía</h3>
        <ul className="list-disc pl-6">
          {topic.bibliography.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </article>
    );
  };

  const renderParagraphs = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => (
      <p key={index} className="text-lg">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <header className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mx-6 flex items-center space-x-2" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <span className="hidden font-bold sm:inline-block">
                Scrum Blog
              </span>
            </a>
          </div>
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px]">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground dark:text-gray-400" />
                <Input
                  placeholder="Buscar documentación..."
                  className="pl-8 md:w-[300px] lg:w-[400px] dark:bg-gray-700 dark:text-white"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <nav className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <Progress value={readingProgress} className="w-full h-1" />

      <div className="container flex-1 p-2 items-start md:grid md:grid-cols-[220px_minmax(0,3fr)_80px] md:gap-6 lg:grid-cols-[240px_minmax(0,4fr)_80px]">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block dark:border-gray-700">
          <SidebarContent />
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_180px]">
          <div className="mx-auto w-full min-w-0">{renderContent()}</div>
          <Questions />
        </main>
      </div>
      <Footer />
    </div>
  );
}
