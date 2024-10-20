import {Page, Layout, Text, Card, BlockStack, Box} from "@shopify/polaris";
import {TitleBar} from "@shopify/app-bridge-react";
import {useTranslation} from "react-i18next";

export default function PageName() {
    const {t} = useTranslation();
    return (
        <Page>
            <TitleBar
                title={t("PageName.title")}>
                <button variant='primary'
                        onClick={() => console.log("Primary Action")}>{t("PageName.primaryAction")}</button>
                <button onClick={() => console.log("Secondary action")}>{t("PageName.secondaryAction")}</button>

            </TitleBar>
            <Layout>
                <Layout.Section>
                    <Box paddingBlockStart="200">
                        <Card>
                            <Text variant="headingMd" as="h2">
                                {t("PageName.heading")}
                            </Text>
                            <BlockStack>
                                <p>{t("PageName.body")}</p>
                            </BlockStack>
                        </Card>
                    </Box>
                    <Box paddingBlockStart="200">
                        <Card sectioned>
                            <Text variant="headingMd" as="h2">
                                {t("PageName.heading")}
                            </Text>
                            <BlockStack>
                                <p>{t("PageName.body")}</p>
                            </BlockStack>
                        </Card>
                    </Box>
                </Layout.Section>
                <Layout.Section secondary>
                    <Card sectioned>
                        <Text variant="headingMd" as="h2">
                            {t("PageName.heading")}
                        </Text>
                        <BlockStack>
                            <p>{t("PageName.body")}</p>
                        </BlockStack>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
