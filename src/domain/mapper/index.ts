import { classes } from '@automapper/classes';
import { createMap, createMapper } from '@automapper/core';
import { UserDTO } from '../dtos/UserDTO';
import { ProfileResponse } from '../responses/ProfileResponse';

export const mapper = createMapper({
  strategyInitializer: classes(),
});

createMap(mapper, UserDTO, ProfileResponse);
