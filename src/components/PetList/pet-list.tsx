interface IPetListProps {
  children: any;
}

function PetList(props: IPetListProps) {
  return <ul className="pet-list">{props.children}</ul>;
}

export default PetList;
