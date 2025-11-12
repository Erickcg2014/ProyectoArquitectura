FROM quay.io/keycloak/keycloak:25.0.0

# (Opcional) Si tienes un realm-export.json para importar roles y clientes al inicio:
# COPY ./keycloak/realm-export /opt/keycloak/data/import

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start", "--hostname-strict=false"]
