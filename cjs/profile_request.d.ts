export declare type R<I extends Input, Verbose extends boolean> = Promise<Schema<I, Verbose>>;
export declare type Id = string | {
    [key: string]: string;
};
export declare type Schema<I extends Input, Verbose extends boolean> = I extends ListUsers ? Users : I extends UsersExternalIds ? ExternalIds<Verbose> : I extends UsersMetadata ? Metadata : I extends UsersEvents ? Events : I extends UsersLinks ? Links<Verbose> : I extends UsersTraits ? Traits<Verbose> : never;
export declare type Input = ListUsers | UsersTraits | UsersExternalIds | UsersMetadata | UsersEvents | UsersLinks;
export declare type IncludeLimitArgs = {
    include?: string[];
    limit?: number;
};
export declare type MetadataArgs = IncludeLimitArgs & {
    exclude?: string[];
    start?: Date;
    end?: Date;
    sort?: 'asc' | 'dsc';
};
export declare type ListUsers = ['users', 'profiles', undefined, {}];
export declare type UsersTraits = ['users/profiles', 'traits', Id, IncludeLimitArgs];
export declare type UsersExternalIds = ['users/profiles', 'external_ids', Id, IncludeLimitArgs];
export declare type UsersMetadata = ['users/profiles', 'metadata', Id, MetadataArgs];
export declare type UsersEvents = ['users/profiles', 'events', Id, {}];
export declare type UsersLinks = ['users/profiles', 'links', Id, {}];
export declare type Cursor = {
    url: string;
    has_more: boolean;
    next: string;
};
export declare type Users = {
    cursor: Cursor;
    data: {
        segment_id: string;
        metadata: {
            created_at: Date;
            modified_at: Date;
        };
    }[];
};
export declare type Traits<Verbose extends boolean> = {
    cursor: Cursor;
    traits: {
        [T: string]: Verbose extends true ? {
            value: string;
            source_id: string;
            updated_at: string;
        } : string;
    };
};
export declare type ExternalId<Verbose extends boolean, C extends 'users' | 'accounts'> = Verbose extends true ? {
    source_id: string;
    collection: C;
    id: string;
    type: string;
    created_at: Date;
    encoding: 'none';
    first_message_id: string;
} : {
    collection: 'users';
    id: string;
    type: string;
    encoding: 'none';
};
export declare type Events = {};
export declare type ExternalIds<Verbose extends boolean> = {
    cursor: Cursor;
    data: ExternalId<Verbose, 'users'>[];
};
export declare type Metadata = {
    metadata: {
        created_at: Date;
        updated_at: Date;
        expires_at: Date | null;
        first_message_id: string;
        first_source_id: string;
        last_message_id: string;
        last_source_id: string;
    };
};
export declare type Links<Verbose extends boolean> = {
    data: {
        to_collection: 'accounts';
        external_ids: ExternalId<Verbose, 'accounts'>[];
    }[];
};
export declare function request<I extends Input, Verbose extends boolean>(token: string, input: I, namespace_id: string, verbose: Verbose): Promise<Schema<I, Verbose>>;
