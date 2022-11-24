import Store from 'electron-store';

const environmentsCollectionName = "environments";

const store = new Store({ name: environmentsCollectionName });

export const GetEnvironments = () => {
    return store.get(environmentsCollectionName) || [];
}

export const InsertEnvironment = (environment) => {
    const environments = GetEnvironments();
    environments.push(environment);

    store.set(environmentsCollectionName, environments);
}

export const DeleteEnvironmentById = (id) => {
    const environments = GetEnvironments().filter(x => x.id !== id);
    store.set(environmentsCollectionName, environments);
}