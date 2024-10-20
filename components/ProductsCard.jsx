import {useState} from "react";
import {Card, BlockStack, Text, InlineStack, Button} from "@shopify/polaris";
import {useTranslation} from "react-i18next";
import {useAppQuery} from "../hooks";
import {useAppBridge} from "@shopify/app-bridge-react";

export function ProductsCard() {
    const app = useAppBridge();
    const [isLoading, setIsLoading] = useState(true);
    const {t} = useTranslation();
    const productsCount = 5;

    const {
        data,
        refetch: refetchProductCount,
        isLoading: isLoadingCount,
    } = useAppQuery({
        url: "/api/products/count",
        reactQueryOptions: {
            onSuccess: () => {
                setIsLoading(false);
            },
        },
    });


    const handlePopulate = async () => {
        setIsLoading(true);
        const response = await fetch("/api/products", {method: "POST"});

        if (response.ok) {
            await refetchProductCount();
            app.toast.show(t("ProductsCard.productsCreatedToast", {
                count: productsCount,
            }));

        } else {
            setIsLoading(false);
            app.toast.show(t("ProductsCard.errorCreatingProductsToast"), {isError: true});

        }
    };

    return (
        <Card
            title={t("ProductsCard.title")}
            sectioned
        >
            <BlockStack gap="5">
                <p>{t("ProductsCard.description")}</p>
                <Text as="h4" variant="headingMd">
                    {t("ProductsCard.totalProductsHeading")}
                    <Text variant="bodyMd" as="p" fontWeight="semibold">
                        {isLoadingCount ? "-" : data.count}
                    </Text>
                </Text>
            </BlockStack>
            <InlineStack align="end">
                <Button
                    tone={"success"}
                    variant="primary"
                    loading={isLoading}
                    onClick={handlePopulate}
                    accessibilityLabel={ t("ProductsCard.populateProductsButton", {
                        count: productsCount,
                    }) }
                >
                    { t("ProductsCard.populateProductsButton", {
                        count: productsCount,
                    }) }
                </Button>
            </InlineStack>
        </Card>
    );
}
