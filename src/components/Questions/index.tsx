import { questionsAndQuotes } from "@/data/questions.data";
import { ScrollArea } from "../ui/scroll-area";

const Questions = () => {
  return (
    <div className="hidden text-sm xl:block">
      <div className="sticky top-16 -mt-10 pt-4">
        <ScrollArea className="pb-10">
          <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12 pr-4">
            <h4 className="mb-4 font-medium leading-none dark:text-gray-200">
              Frases inspiradoras
            </h4>
            <ul className="m-0 list-none">
              {questionsAndQuotes.map((item, index) => (
                <li
                  key={index}
                  className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600"
                >
                  <a
                    href="#"
                    className="text-sm font-[500] text-black hover:text-foreground dark:text-gray-300 dark:hover:text-gray-100"
                  >
                    {item.question}
                  </a>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {item.quote}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Questions;
