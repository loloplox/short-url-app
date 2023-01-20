import {Anchor, Box, Button, Text} from "grommet";
import {Trash} from "grommet-icons";
import {useUrlStore} from "../store/urlsStore";

export default function ListItem({item}) {
    const removeUrlStore = useUrlStore(state => state.removeUrl)
    const urlEncode = process.env.REACT_APP_API_URL + "/" + item.urlEncode
    const url = item.url

    return (
        <Box pad={{vertical: "xsmall"}} direction="row" justify="between" width="100%" >
            <Box gap="small" width="60%" overflow="hidden">
                <Text size="small" truncate={true}>{url}</Text>
                <Anchor href={urlEncode} size="small" label={urlEncode} />
            </Box>
            <Box width="20%">
                <Button secondary label={<Trash />} onClick={() => removeUrlStore(item.id)}/>
            </Box>
        </Box>
    )
}