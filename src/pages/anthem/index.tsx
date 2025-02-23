"use client";

// ** React/Next.js Imports
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

// ** Custom Components, Hooks, Utils, etc.
import { useLicense } from "@/context/LicenseContext";
import { useSpotify } from "@/context/SpotifyContext";
import type { Catalog } from "@/types/catalog";
import { api } from "@/utils/trpc";

import AnthemSelection from "./_components/AnthemSelection";
import SelectedAnthem from "./_components/SelectedAnthem";

/**
 * The `Anthem` component allows users to search for and select an anthem from a catalog of songs.
 * It provides a search input to filter songs by name or album name, displays the search results,
 * and allows users to select a song as their anthem. Once a song is selected, it can be played
 * using the MediaPlayer component. The selected anthem can be submitted, which triggers an update
 * to the user's profile and navigates to the signature page.
 *
 * Features:
 * - Search for songs by name or album name.
 * - Display search results with album cover images.
 * - Select a song as an anthem.
 * - Play the selected anthem using the MediaPlayer component.
 * - Submit the selected anthem to update the user's profile.
 * - Custom hooks and utilities for context and API interactions.
 */

const Anthem: React.FC = () => {
  const router = useRouter();
  const { artistCatalog } = useSpotify();

  const { licenseID } = useLicense();
  const { mutateAsync: updateAnthem } = api.fans.anthem.useMutation();

  const [selectedAnthem, setSelectedAnthem] = useState<Catalog | null>(null);
  const [mounted, setMounted] = useState(false);

  // Add this to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  const handleSubmit = async () => {
    if (!selectedAnthem) {
      alert("Please select an anthem first.");
      return;
    }

    try {
      const data = await updateAnthem({
        uuid: licenseID!,
        anthem: selectedAnthem,
      });

      if (!data) {
        throw new Error("Failed to save anthem");
      }

      router.push("/signature");
    } catch (error) {
      console.error("Error saving anthem:", error);
      alert("Failed to save anthem. Please try again.");
    }
  };

  return (
    <div className='h-screen w-full bg-black p-8'>
      <div className='h-full max-w-screen-lg flex flex-col justify-self-center gap-8'>
        <h1 className='font-bold text-2xl sm:text-5xl text-center text-white my-2'>
          Choose Your SGaWD Anthem
        </h1>
        <AnthemSelection
          className='flex-1 h-full'
          tracks={artistCatalog.items}
          selectedTrack={selectedAnthem}
          setSelectedTrack={setSelectedAnthem}
        />
        {selectedAnthem && (
          <div className='w-full'>
            <SelectedAnthem
              track={selectedAnthem}
              onConfirm={handleSubmit}
              onClear={() => setSelectedAnthem(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Anthem;
