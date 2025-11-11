declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.jpeg" {
  const content: any;
  export default content;
}

type PostCardProps = {
  _id: Id<"posts">;
  authorAva?: string;
  authorId: string;
  authorName: string;
  image?: string;
  text: string;
  _creationTime: number;
};
