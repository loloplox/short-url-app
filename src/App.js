import {
    Box,
    Button,
    Form,
    grommet,
    Grommet,
    Header,
    Heading, List,
    Page,
    PageContent,
    PageHeader,
    Text,
    TextInput
} from 'grommet';
import {deepMerge} from "grommet/utils";
import {useEffect, useState} from "react";
import {Add, Link, Send, Sun} from "grommet-icons";
import ListItem from "./components/ListItem";
import {useUrlStore} from "./store/urlsStore";
import axios from "axios";

const theme = deepMerge(grommet,
    {
        global: {
            font: {
                family: "Roboto",
                size: "18px",
                height: "20px",
            }
        },
    }
)

function App() {
    const [url, setUrl] = useState("")
    const urlStore = useUrlStore(state => state.urls)
    const addUrlStore = useUrlStore(state => state.addUrl)

    const handleAddURL = async () => {
        const body = JSON.stringify({url: url})
        const response = await axios.post("http://localhost:8080/api/v1/encode", body, {
            headers: {
                "content-type": "application/json"
            }
        })

        addUrlStore(response.data)
        console.log(urlStore)
    }

    return (
        <Grommet full theme={theme} themeMode="dark">
            <Page overflow="hidden">
                <PageContent align="center">
                    <Heading color="brand" textAlign="center">Short URL</Heading>

                    <Box
                        margin={{vertical: "medium"}}
                        background="background-contrast"
                        round="medium"
                        width="600px" height="700px"
                        pad={{vertical: "medium", left: "medium", right: "medium"}}
                        overflow="hidden"
                    >
                        <Form onSubmit={() => handleAddURL()}>
                            <TextInput
                                placeholder="Type your URL here"
                                icon={<Link />}
                                value={url}
                                onChange={event => setUrl(event.target.value)}
                                required
                            />

                            <Box margin={{vertical: "small"}}>
                                <Button type="submit" primary icon={<Add />} label="Encode" />
                            </Box>
                        </Form>


                        <Box overflow={"auto"}>
                            <List
                                margin={{vertical: "medium"}}
                                data={urlStore}
                                children={(item, index) => <ListItem item={item}/>}
                            />
                        </Box>

                    </Box>
                </PageContent>
            </Page>
        </Grommet>
    )
}

export default App
