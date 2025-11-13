FROM quay.io/keycloak/keycloak:25.0.0

COPY multichannel-realm.json /opt/keycloak/data/import/multichannel-realm.json

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start-dev", "--import-realm", "--features=import-export", "--http-enabled=true", "--hostname-strict=false"]
