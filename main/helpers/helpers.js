import { Kafka } from 'kafkajs';

export function NewGuid() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export function GetKafkaBusByEnvironment(
  environment,
  clientId = 'kafka-monitor')
{
  return new Kafka({
      clientId: clientId,
      brokers: environment.servers.split(','),
      ssl: environment.useAuthentication ?? false,
      sasl: environment.useAuthentication ?
        {
          username: environment.username,
          password: environment.password,
          mechanism: environment.mechanism,
        } :
        undefined,
  });
}
