import Store from 'electron-store';

const environmentsCollectionName = "environments-v1";

const store = new Store({ name: environmentsCollectionName });

export const GetEnvironments = () => {
    const environments = store.get(environmentsCollectionName) || [];
    
    if (Object.keys(environments).length === 0) {
        return [];
    }

    return environments || [];
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

// Consumer Groups
const consumerGroupsCollectionName = "consumerGroups-v1";

const consumerGroupsStore = new Store({ name: consumerGroupsCollectionName });

export const GetConsumersGroup = () => {
    const consumers = consumerGroupsStore.get(consumerGroupsStore);
    
    if (Object.keys(consumers).length === 0) {
        return [];
    }

    return consumerGroupsStore.get(consumerGroupsCollectionName) || [];
}

export const InsertConsumersGroup = (newGroup) => {
    const consumersGroup = GetConsumersGroup();
    consumersGroup.push(newGroup);

    consumerGroupsStore.set(consumerGroupsCollectionName, consumersGroup);
}

export const DeleteConsumerGroupById = (id) => {
    const consumersGroup = GetConsumersGroup().filter(x => x.id !== id);
    consumerGroupsStore.set(consumerGroupsCollectionName, consumersGroup);
}
