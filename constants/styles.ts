export const triggerStyles = `
    
    relative flex-1 bg-transparent text-muted-foreground transition-none
    hover:text-
    data-[state=active]:text-primary data-[state=active]:shadow-none
    after:content-[''] after:absolute after:h-[2px] after:w-full
    after:bg-space-blue-light after:-bottom-3
    after:left-0 after:scale-x-0 after:origin-center
    after:transition-transform after:duration-300 after:ease-in-out
    hover:after:scale-x-100
    data-[state=active]:after:scale-x-100
  `;
