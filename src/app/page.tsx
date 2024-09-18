import { dataPage } from "@/lib/list_page";
import { Card, Container, Flex, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { DisplayReadme } from "./_component/DisplayReadme";
import { LoadReadme } from "./_component/LoadReadme";

export default function Page() {
    return (
        <Stack flex={1} h="100vh" w="100%" p="md">
            <Title>WIBU EXAMPLE</Title>
            <Container>
                <Stack gap="md">
                    <Flex wrap="wrap" gap="md" justify="center">
                        {dataPage.map((v, k) => (
                            <Card w={300} key={k} component={Link} href={v.url}>
                                <Text>{v.name}</Text>
                            </Card>
                        ))}
                    </Flex>
                    <LoadReadme>
                        {data => <DisplayReadme data={data} />}
                    </LoadReadme>
                </Stack>
            </Container>
        </Stack>
    );
}