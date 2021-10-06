import { addYears, parseISO } from "date-fns";
import faker from "faker";

import { TENURE_TYPES } from "../../../constants";

import {
  Person,
  PersonTitle,
  PersonType,
  TenureSummary,
} from "@mtfh/common/lib/api/person/v1";

faker.seed(1);

export const generateMockTenureSummaryV1 = (
  data: Partial<TenureSummary> = {},
): TenureSummary => {
  const isActive = data.isActive !== undefined ? data.isActive : faker.datatype.boolean();
  const startDate = data.startDate
    ? parseISO(data.startDate)
    : faker.date.between("2010-01-01", "2020-01-01");
  return {
    id: faker.datatype.uuid(),
    type: faker.random.arrayElement(TENURE_TYPES.map((type) => type.value)),
    assetFullAddress: [faker.address.streetAddress(), faker.address.zipCode()].join(", "),
    assetId: faker.datatype.uuid(),
    startDate: startDate.toISOString(),
    endDate: !isActive ? addYears(startDate, 1).toISOString() : null,
    isActive,
    paymentReference: faker.random.alphaNumeric(10),
    propertyReference: faker.random.alphaNumeric(10),
    uprn: faker.random.alphaNumeric(10),
    ...data,
  };
};

export const generateMockPersonV1 = (data: Partial<Person> = {}): Person => ({
  id: faker.datatype.uuid(),
  title: faker.helpers.replaceSymbolWithNumber(
    faker.random.arrayElement(Object.getOwnPropertyNames(PersonTitle)),
  ) as PersonTitle,
  firstName: faker.name.firstName(),
  middleName: faker.datatype.boolean() ? faker.name.middleName() : null,
  surname: faker.name.lastName(),
  preferredTitle: faker.datatype.boolean()
    ? (faker.helpers.replaceSymbolWithNumber(
        faker.random.arrayElement(Object.getOwnPropertyNames(PersonTitle)),
      ) as PersonTitle)
    : null,
  preferredFirstName: faker.datatype.boolean() ? faker.name.firstName() : null,
  preferredMiddleName: faker.datatype.boolean() ? faker.name.middleName() : null,
  preferredSurname: faker.datatype.boolean() ? faker.name.lastName() : null,
  placeOfBirth: faker.address.city(),
  dateOfBirth: faker.date.past().toISOString(),
  personTypes: faker.random.arrayElements(
    ["Tenant", "Leaseholder", "Freeholder", "HouseholdMember"],
    faker.datatype.number({ min: 1, max: 2 }),
  ) as PersonType[],
  tenures: Array.from({ length: faker.datatype.number({ min: 1, max: 4 }) }).map(() =>
    generateMockTenureSummaryV1({ isActive: faker.datatype.boolean() }),
  ),
  reason: faker.lorem.sentence(),
  ...data,
});
