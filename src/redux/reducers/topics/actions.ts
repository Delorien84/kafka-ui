import { createAsyncAction} from 'typesafe-actions';
import ActionType from './actionType';
import { Topic, TopicDetails, TopicName, TopicConfig} from 'lib/interfaces';

export const fetchTopicListAction = createAsyncAction(
  ActionType.GET_TOPICS__REQUEST,
  ActionType.GET_TOPICS__SUCCESS,
  ActionType.GET_TOPICS__FAILURE,
)<undefined, Topic[], undefined>();

export const fetchTopicDetailsAction = createAsyncAction(
  ActionType.GET_TOPIC_DETAILS__REQUEST,
  ActionType.GET_TOPIC_DETAILS__SUCCESS,
  ActionType.GET_TOPIC_DETAILS__FAILURE,
)<undefined, { topicName: TopicName, details: TopicDetails }, undefined>();

export const fetchTopicConfigAction = createAsyncAction(
  ActionType.GET_TOPIC_CONFIG__REQUEST,
  ActionType.GET_TOPIC_CONFIG__SUCCESS,
  ActionType.GET_TOPIC_CONFIG__FAILURE,
)<undefined, { topicName: TopicName, config: TopicConfig[] }, undefined>();

export const createTopicAction = createAsyncAction(
  ActionType.POST_TOPIC__REQUEST,
  ActionType.POST_TOPIC__SUCCESS,
  ActionType.POST_TOPIC__FAILURE,
)<undefined, undefined, undefined>();