type Country = "USA" | "აშშ" | "China" | "ჩინეთი" | "Dubai" | "დუბაი" | "United Kingdom" | "დიდი ბრიტანეთი" | "Turkey" | "თურქეთი" | "Greece" | "საბერძნეთი" | "Hong Kong" | "ჰონგ კონგი";

interface NewsItem {
    id: number;
    imgSrc: string;
    imgAlt: string;
    title: string;
    footerText: string;
    color: string;
    image: string;
}