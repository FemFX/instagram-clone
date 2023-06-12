import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { debounce } from "lodash";
import { useMutation } from "@tanstack/react-query";
import { searchUser } from "@/services/user.service";

export interface ISearchProps {
  isOpen: boolean;
  onClose: () => void;
}
const Search: FC<ISearchProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { mutate, data, isSuccess } = useMutation({
    mutationKey: ["search"],
    mutationFn: (search: string) => searchUser(search),
  });

  const debouncedSearch = debounce((search) => handleSearch(search), 500);

  const handleChange = (e) => {
    setLoading(true);
    debouncedSearch(e.target.value);
  };
  const handleSearch = async (search) => {
    try {
      // perform search request
      search !== "" && mutate(search);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Поисковый запрос</DrawerHeader>

          <DrawerBody>
            <Input onChange={(e) => handleChange(e)} placeholder="Поиск" />
            <hr className="my-3" />
            <div className="mt-3">
              {loading ? (
                <Spinner />
              ) : (
                isSuccess && data.map((u) => <div key={u.id}>{u.username}</div>)
              )}
            </div>
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default Search;
