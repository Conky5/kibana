/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

export function deserializeCluster(name, esClusterObject) {
  if(!name || !esClusterObject || typeof esClusterObject !== 'object') {
    throw new Error('Unable to deserialize cluster');
  }

  let deserializedClusterObject;
  const {
    seeds,
    connected: isConnected,
    num_nodes_connected: connectedNodesCount,
    max_connections_per_cluster: maxConnectionsPerCluster,
    initial_connect_timeout: initialConnectTimeout,
    skip_unavailable: skipUnavailable,
    transport,
  } = esClusterObject;

  deserializedClusterObject = {
    name,
    seeds,
    isConnected,
    connectedNodesCount,
    maxConnectionsPerCluster,
    initialConnectTimeout,
    skipUnavailable,
  };

  if(transport) {
    const {
      ping_schedule: transportPingSchedule,
      compress: transportCompress,
    } = transport;

    deserializedClusterObject = {
      ...deserializedClusterObject,
      transportPingSchedule,
      transportCompress,
    };
  }

  return deserializedClusterObject;
}

export function serializeCluster(deserializedClusterObject) {
  if(!deserializedClusterObject || typeof deserializedClusterObject !== 'object') {
    throw new Error('Unable to serialize cluster');
  }
  const {
    seeds,
    skipUnavailable,
  } = deserializedClusterObject;

  const esClusterObject = {
    seeds,
    skip_unavailable: skipUnavailable,
  };

  return esClusterObject;
}