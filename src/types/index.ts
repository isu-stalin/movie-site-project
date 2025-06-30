export interface IMovie{
    id: number,
    title: string,
    backdrop_path: string,
    poster_path: string,
    vote_average: number;
    genres: IGenre[];
}

export interface IGenre {
    id: number,
    name: string
}
export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;

}
export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}  