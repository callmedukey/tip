declare module '@splidejs/react-splide';

declare type CMS_Content_RichText = {
    text?: string;
    bold?: boolean;
    url?: string;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    type?: CMS_Content_RichText_Type;
    newTab?: boolean;
    children: CMS_Content_RichText[];
    value?: {
        url: string;
        width: number;
        height: number;
        alt?: string;
    }
    createdAt: Date;
};
