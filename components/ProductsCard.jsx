import {useState} from "react";
import {LegacyCard, TextContainer, Text} from "@shopify/polaris";
import {useTranslation} from "react-i18next";
import {useAppQuery} from "../hooks";
import {useAppBridge} from "@shopify/app-bridge-react";

export function ProductsCard() {
    const app = useAppBridge();
    const emptyToastProps = {content: null};
    const [isLoading, setIsLoading] = useState(true);
    const {t} = useTranslation();
    const productsCount = 5;

    const {
        data,
        refetch: refetchProductCount,
        isLoading: isLoadingCount,
        isRefetching: isRefetchingCount,
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
        <LegacyCard
            title={t("ProductsCard.title")}
            sectioned
            primaryFooterAction={{
                content: t("ProductsCard.populateProductsButton", {
                    count: productsCount,
                }),
                onAction: handlePopulate,
                loading: isLoading,
            }}
        >
            <TextContainer spacing="loose">
                <p>{t("ProductsCard.description")}</p>
                <Text as="h4" variant="headingMd">
                    {t("ProductsCard.totalProductsHeading")}
                    <Text variant="bodyMd" as="p" fontWeight="semibold">
                        {isLoadingCount ? "-" : data.count}
                    </Text>
                </Text>
            </TextContainer>
        </LegacyCard>
    );
}
