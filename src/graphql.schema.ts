
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreatePlantInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
}

export abstract class IQuery {
    abstract plants(): Nullable<Nullable<Plant>[]> | Promise<Nullable<Nullable<Plant>[]>>;

    abstract plant(id: string): Nullable<Plant> | Promise<Nullable<Plant>>;
}

export abstract class IMutation {
    abstract createPlant(createPlantInput?: Nullable<CreatePlantInput>): Nullable<Plant> | Promise<Nullable<Plant>>;
}

export abstract class ISubscription {
    abstract planCreated(): Nullable<Plant> | Promise<Nullable<Plant>>;
}

export class Owner {
    id: number;
    name: string;
    age?: Nullable<number>;
    plants?: Nullable<Plant[]>;
}

export class Plant {
    id?: Nullable<number>;
    name?: Nullable<string>;
    age?: Nullable<number>;
    owner?: Nullable<Owner>;
}

type Nullable<T> = T | null;
