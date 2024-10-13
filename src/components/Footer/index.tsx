const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-800 dark:border-gray-700">
      <div className="container flex justify-between items-center py-4">
        <p className="text-sm text-muted-foreground">
          © 2023 Blog de Metodología Ágil SCRUM. Todos los derechos reservados.
        </p>
        <nav className="flex space-x-4">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Términos
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacidad
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Contacto
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
