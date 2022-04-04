import { CONSTS } from 'data/constants';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function isMale(gender) {
  return gender === CONSTS.MALE;
}
export function findTreeRows(members) {
  let membersLvls = members.flatMap((el) => el[1].position.row);
  membersLvls = Array.from(new Set(membersLvls));
  return membersLvls;
}
export function findYoungestMemberId(nodes) {
  return Object.entries(nodes).reduce((a, b) => (a[1].position.row > b[1].position.row ? a : b))[0];
}
export function findRelatives(memberId, lists, relation) {
  const relatives = lists[memberId].filter((el) => el.type === relation).map((el) => el.to);
  return relatives;
}
export function findUnplacedRelatives(nodes, memberId, lists, relation) {
  const relatives = findRelatives(memberId, lists, relation);
  const unplacedRelatives = relatives ? relatives.filter((el) => nodes[el].position.column === null) : null;
  return unplacedRelatives;
}
export function findUnplacedRelativesSortIfPartnerHaveParents(
  nodes,
  memberId,
  lists,
  relation,
  haveParentsPrefferable
) {
  const relatives = lists[memberId].filter((el) => el.type === relation).map((el) => el.to);
  let unplacedRelatives = relatives ? relatives.filter((el) => nodes[el].position.column === null) : null;
  if (relatives) {
    unplacedRelatives.sort((el) => {
      const [partner] = findUnplacedRelatives(nodes, el, lists, CONSTS.PARTNER);
      return partner ? (nodes[partner].haveParents === haveParentsPrefferable ? -1 : 1) : 1;
    });
  }
  return unplacedRelatives;
}
export const findAllRelations = (lists, relationType) => {
  let rel = [];
  Object.keys(lists).forEach((key, index) => {
    const filteredSiblingsRelationsIds = lists[key].filter((el) => el.type === relationType).map(({ to }) => to);
    if (filteredSiblingsRelationsIds.length) {
      rel.push([key, filteredSiblingsRelationsIds]);
    }
  });
  return rel;
};
